import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/base.service';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Address } from 'src/modules/customer-services/address/entities/address.entity';
import { Customer } from 'src/modules/user-services/customer/entities/customer.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { ORDER_STAUTS, PAYMENT_METHOD, PAYMENT_STATUS } from 'src/common/enums/enums';
import { StripeService } from 'src/modules/payment-services/stripe/stripe.service';
import { DingerService } from 'src/modules/payment-services/dinger/dinger.service';

@Injectable()
export class OrdersService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly stripeService: StripeService,

    private readonly dingerService: DingerService,
  ) {
    super(orderRepository)
  }

  async createNewOrder(data: any, user: any) {
    const newOrder = await this.orderRepository.manager.transaction(async transactionalEntityManager => {
      const orderData = data.data;
      let shipping_address: Address;

      const customer = await transactionalEntityManager.findOne(Customer, {
        where: {
          id: user.user_id
        }
      })

      const customerAddress = await transactionalEntityManager.findOne(Address, {
        where: {
          phone_number: orderData.shippingAddress.phone_number,
          house_number: orderData.shippingAddress.house_number
        }
      })

      const addressPayload = {
        address: orderData.shippingAddress.address,
        house_number: orderData.shippingAddress.house_number,
        road: orderData.shippingAddress.road,
        district: orderData.shippingAddress.district,
        sub_district: orderData.shippingAddress.sub_district,
        province: orderData.shippingAddress.province,
        phone_number: orderData.shippingAddress.phone_number,
        postal_code: orderData.shippingAddress.postal_code,
        country: orderData.shippingAddress.country,
        customer: {
          id: customer?.id
        }
      }

      let checkoutSession;
      if (orderData.paymentMethod == "card") {
        checkoutSession = await this.stripeService.createCheckoutSession(orderData.orderItems)
      }
      if (!customerAddress) {
        shipping_address = transactionalEntityManager.create(Address, addressPayload);
        shipping_address = await transactionalEntityManager.save(shipping_address);
      } else {
        shipping_address = orderData.shippingAddress;
      }

      const address = await transactionalEntityManager.findOne(Address, {
        where: {
          id: shipping_address.id
        }
      })

      const totalAmount = orderData.orderItems.map((item: any) => {
        return Number(item.priceAtOrder) * Number(item.quantity)
      }).reduce((sum, current) => sum + current, 0)

      await this.dingerService.Pay(orderData)
      try {
        let order = transactionalEntityManager.create(Order, {
          total_amount: totalAmount,
          order_status: ORDER_STAUTS.PENDING,
          payment_status: PAYMENT_STATUS.PENDING,
          payment_method: orderData.paymentMethod,
          stripe_session_id: checkoutSession ? checkoutSession.id : null,
          customer: {
            id: customer?.id
          },
          shipping_address: {
            id: address?.id
          },
        })
        order = await transactionalEntityManager.save(order);

        await Promise.all(orderData.orderItems.map(async (item: any) => {
          let orderItem = transactionalEntityManager.create(OrderItem, {
            price_at_order: Number(item.variation.price),
            quantity: item.quantity,
            product: {
              id: item.product.id
            },
            variation: {
              id: item.variation.id
            },
            order: {
              id: order.id
            }
          })

          await transactionalEntityManager.save(orderItem)
        }))
        return {
          order,
          stripeSessionId: checkoutSession.id,
        }
      } catch (error) {
        console.error(error)
      }

    })
    return newOrder;
  }

  async updatePaymentStatus(stripe_session_id: string, payment_status) {
    const order = await this.orderRepository.findOne({
      where: {
        stripe_session_id,
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    order.payment_status = payment_status;
    order.order_status = payment_status == PAYMENT_STATUS.PAID ? ORDER_STAUTS.PROCESSING : ORDER_STAUTS.PENDING;
    await this.orderRepository.save(order);

    return order;
  }

  private GetDingerToken() {

  }
}
