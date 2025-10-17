import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/base.service';
import { Order } from './entities/order.entity';
import { DataSource, In, Repository } from 'typeorm';
import { Address } from 'src/modules/customer-services/address/entities/address.entity';
import { Customer } from 'src/modules/user-services/customer/entities/customer.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { ORDER_STAUTS, PAYMENT_METHOD, PAYMENT_STATUS } from 'src/common/enums/enums';
import { StripeService } from 'src/modules/payment-services/stripe/stripe.service';
import { DingerService } from 'src/modules/payment-services/dinger/dinger.service';
import { StripeLog } from 'src/modules/payment-services/stripe-log/entities/stripe-log.entity';
import { DingerLogService } from 'src/modules/payment-services/dinger-log/dinger-log.service';
import { getMethodAndProvider } from 'src/common/utils/payment_method.util';
import { DingerLog } from 'src/modules/payment-services/dinger-log/entities/dinger-log.entity';
import { PaymentLog } from 'src/modules/payment-services/payment-log/entities/payment-log.entity';
import { ProductVariation } from 'src/modules/product-services/product-variation/entities/product-variation.entity';

@Injectable()
export class OrdersService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(StripeLog)
    private readonly stripeLogRepository: Repository<StripeLog>,


    @InjectDataSource()
    private readonly dataSource: DataSource,

    private readonly stripeService: StripeService,

    private readonly dingerService: DingerService,

  ) {
    super(orderRepository)
  }

  /* async createNewOrder(data: any, user: any) {
    const newOrder = await this.dataSource.transaction(async transactionalEntityManager => {
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
      let dingerData;
      if (orderData.paymentMethod == "card") {
        checkoutSession = await this.stripeService.createCheckoutSession(orderData.orderItems)
      } else {
        dingerData = await this.dingerService.Pay(orderData)
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

      try {
        let order = transactionalEntityManager.create(Order, {
          total_amount: totalAmount,
          order_status: ORDER_STAUTS.PENDING,
          payment_status: PAYMENT_STATUS.PENDING,
          payment_method: orderData.paymentMethod,
          stripe_session_id: checkoutSession ? checkoutSession?.id : null,
          dinger_transaction_id: dingerData ? dingerData.transactionNum : null,
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

          if (orderData.paymentMethod == "card") {
            let stripeLog = transactionalEntityManager.create(StripeLog, {
              session: checkoutSession?.id,
              status: PAYMENT_STATUS.PENDING,
              amount: totalAmount,
              orderId: order.id,
              customerId: customer?.id
            })
            await transactionalEntityManager.save(stripeLog)

            let paymentLog = transactionalEntityManager.create(PaymentLog, {
              transaction_id: checkoutSession?.id,
              status: PAYMENT_STATUS.PENDING,
              amount: totalAmount,
              method: 'card',
              provider: 'stripe',
              orderId: order.id,
              customerId: customer?.id
            })

            await transactionalEntityManager.save(paymentLog)
          } else {
            const dingerProviderData = getMethodAndProvider(orderData.paymentMethod);

            const newDingerLog = transactionalEntityManager.create(DingerLog, {
              transactionNum: dingerData.transactionNum,
              status: PAYMENT_STATUS.PENDING,
              amount: Number(dingerData.totalAmount),
              orderId: order.id,
              customerId: customer?.id,
              method: dingerProviderData?.method,
              provider: dingerProviderData?.provider
            })

            await transactionalEntityManager.save(newDingerLog)

            let paymentLog = transactionalEntityManager.create(PaymentLog, {
              transaction_id: dingerData.transactionNum,
              status: PAYMENT_STATUS.PENDING,
              amount: Number(dingerData.totalAmount),
              method: dingerProviderData?.method,
              provider: dingerProviderData?.provider,
              orderId: order.id,
              customerId: customer?.id
            })

            await transactionalEntityManager.save(paymentLog)

          }
        }))
        return {
          order,
          stripeSessionId: checkoutSession?.id,
          dingerData: dingerData ?? null,
        }
      } catch (error) {
        console.error(error)
      }

    })
    return newOrder;
  } */

  async createNewOrder(data: any, user: any) {
    const newOrder = await this.dataSource.transaction(async transactionalEntityManager => {
      const orderData = data.data;
      let shipping_address: Address;

      const customer = await transactionalEntityManager.findOne(Customer, {
        where: {
          id: user.user_id
        }
      });

      if (!customer) {
        throw new Error("Customer not found.");
      }

      // --- 1. Lock Product Variations & Check Stock ---

      // အော်ဒါထဲက variation IDs များကို စုစည်းပြီး Lock ချရန်
      const variationIds = orderData.orderItems.map((item: any) => item.variation.id);

      // ProductVariation များကို Pessimistic Write Lock (FOR UPDATE) ဖြင့် ဆွဲထုတ်ပါ
      const lockedVariations = await transactionalEntityManager.find(ProductVariation, {
        where: {
          id: In(variationIds),
        },
        // ********************************************
        // ** ROW LOCKS: Pessimistic Write Lock **
        // ********************************************
        lock: {
          mode: 'pessimistic_write',
        },
      });

      const lockedVariationsMap = new Map(
        lockedVariations.map(v => [v.id, v])
      );

      // Stock စစ်ဆေးခြင်း (Check Stock After Lock)
      for (const item of orderData.orderItems) {
        const variationId = item.variation.id;
        const quantity = Number(item.quantity);
        const lockedVariation = lockedVariationsMap.get(variationId);

        if (!lockedVariation) {
          // အကယ်၍ variation ID မှားယွင်းနေပါက
          throw new Error(`Variation with ID ${variationId} not found.`);
        }

        // Stock မလုံလောက်ခြင်း ရှိမရှိ စစ်ဆေးခြင်း
        if (lockedVariation.stock < quantity) {
          throw new Error(`Insufficient stock for ${lockedVariation.sku}. Available: ${lockedVariation.stock}, Requested: ${quantity}`);
        }
      }
      // --- End of Lock and Stock Check ---

      // ... (customerAddress & addressPayload logic is unchanged)
      const customerAddress = await transactionalEntityManager.findOne(Address, {
        where: {
          phone_number: orderData.shippingAddress.phone_number,
          house_number: orderData.shippingAddress.house_number
        }
      });

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
          id: customer.id
        }
      };

      // ... (payment service calls: stripeService, dingerService - unchanged)
      let checkoutSession;
      let dingerData;
      if (orderData.paymentMethod == "card") {
        checkoutSession = await this.stripeService.createCheckoutSession(orderData.orderItems);
      } else {
        dingerData = await this.dingerService.Pay(orderData);
      }

      if (!customerAddress) {
        shipping_address = transactionalEntityManager.create(Address, addressPayload);
        shipping_address = await transactionalEntityManager.save(shipping_address);
      } else {
        shipping_address = customerAddress;
      }

      const address = await transactionalEntityManager.findOne(Address, {
        where: {
          id: shipping_address.id
        }
      });

      const totalAmount = orderData.orderItems.map((item: any) => {
        return Number(item.variation.price) * Number(item.quantity);
      }).reduce((sum: number, current: number) => sum + current, 0);

      try {
        let order = transactionalEntityManager.create(Order, {
          total_amount: totalAmount,
          order_status: ORDER_STAUTS.PENDING,
          payment_status: PAYMENT_STATUS.PENDING,
          payment_method: orderData.paymentMethod,
          stripe_session_id: checkoutSession ? checkoutSession?.id : null,
          dinger_transaction_id: dingerData ? dingerData.transactionNum : null,
          customer: {
            id: customer.id
          },
          shipping_address: {
            id: address?.id
          },
        });
        order = await transactionalEntityManager.save(order);

        // --- 2. Create Order Items & Update Stock in Parallel ---
        await Promise.all(orderData.orderItems.map(async (item: any) => {
          const variationId = item.variation.id;
          const quantity = Number(item.quantity);
          const lockedVariation = lockedVariationsMap.get(variationId);

          // Inventory Update (Stock Reduction)
          if (lockedVariation) {
            // ** stock ကို item quantity အလိုက်လျှော့ချခြင်း **
            lockedVariation.stock = Number(lockedVariation.stock) - quantity;

            // Out-of-stock flag ကို စစ်ဆေးပြီး လိုအပ်ပါက ပြောင်းလဲခြင်း
            if (lockedVariation.stock === 0) {
              lockedVariation.is_out_of_stock = true;
            }

            // Database သို့ save လုပ်ခြင်း (Transaction ပြီးမှ Commit ဖြစ်မည်)
            await transactionalEntityManager.save(lockedVariation);
          }

          // Create Order Item
          let orderItem = transactionalEntityManager.create(OrderItem, {
            price_at_order: Number(item.variation.price),
            quantity: quantity,
            product: {
              id: item.product.id
            },
            variation: {
              id: variationId
            },
            order: {
              id: order.id
            }
          });
          await transactionalEntityManager.save(orderItem);

          // ... (Payment Logging Logic - unchanged)
          if (orderData.paymentMethod == "card") {
            let stripeLog = transactionalEntityManager.create(StripeLog, {
              session: checkoutSession?.id,
              status: PAYMENT_STATUS.PENDING,
              amount: totalAmount,
              orderId: order.id,
              customerId: customer.id
            });
            await transactionalEntityManager.save(stripeLog);

            let paymentLog = transactionalEntityManager.create(PaymentLog, {
              transaction_id: checkoutSession?.id,
              status: PAYMENT_STATUS.PENDING,
              amount: totalAmount,
              method: 'card',
              provider: 'stripe',
              orderId: order.id,
              customerId: customer.id
            });
            await transactionalEntityManager.save(paymentLog);
          } else {
            const dingerProviderData = getMethodAndProvider(orderData.paymentMethod);

            const newDingerLog = transactionalEntityManager.create(DingerLog, {
              transactionNum: dingerData.transactionNum,
              status: PAYMENT_STATUS.PENDING,
              amount: Number(dingerData.totalAmount),
              orderId: order.id,
              customerId: customer.id,
              method: dingerProviderData?.method,
              provider: dingerProviderData?.provider
            });
            await transactionalEntityManager.save(newDingerLog);

            let paymentLog = transactionalEntityManager.create(PaymentLog, {
              transaction_id: dingerData.transactionNum,
              status: PAYMENT_STATUS.PENDING,
              amount: Number(dingerData.totalAmount),
              method: dingerProviderData?.method,
              provider: dingerProviderData?.provider,
              orderId: order.id,
              customerId: customer.id
            });

            await transactionalEntityManager.save(paymentLog);
          }
        }));
        // --- End of Order Items & Stock Update ---

        return {
          order,
          stripeSessionId: checkoutSession?.id,
          dingerData: dingerData ?? null,
        };
      } catch (error) {
        console.error(error);
        // Transaction failed, the lock will be released and changes rolled back.
        throw error;
      }
    });
    return newOrder;
  }

  async updatePaymentStatus(transactionId: string, payment_status: PAYMENT_STATUS, payment_intent: string = "") {
    const order = await this.orderRepository.findOne({
      where: [
        {
          stripe_session_id: transactionId
        },
        {
          dinger_transaction_id: transactionId
        }
      ],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    order.payment_status = payment_status;
    order.stripe_transaction_id = payment_intent;
    //order.order_status = payment_status == PAYMENT_STATUS.PAID ? ORDER_STAUTS.PROCESSING : ORDER_STAUTS.PENDING;
    await this.orderRepository.save(order);

    return order;
  }

  async findMyOrder(user) {
    const orders = await this.orderRepository.find({
      where: {
        customer: {
          id: user.user_id
        }
      },
      relations: ['order_items']
    })

    return orders
  }

  async checkPaymentStatus({ transactionId }: { transactionId: string }) {
    console.log('id', transactionId)
    console.log(new Date())
    console.log('.........')
    return this.orderRepository.findOne({
      where: {
        dinger_transaction_id: transactionId
      }
    })
  }
}
