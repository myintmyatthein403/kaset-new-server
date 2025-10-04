import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import postgresConfig from './common/config/postgres.config';
import { LoggerModule } from './common/services/logger/logger.module';
import { TokenModule } from './common/services/token/token.module';
import { AuthModule } from './modules/auth-services/auth/auth.module';
import { UserModule } from './modules/user-services/user/user.module';
import { WinstonLoggerService } from './common/services/logger/winston-logger.service';
import { RoleModule } from './modules/user-services/role/role.module';
import { PermissionModule } from './modules/user-services/permission/permission.module';
import { UserProfileModule } from './modules/user-services/user-profile/user-profile.module';
import { MediaModule } from './modules/media-services/media/media.module';
import { TrackModule } from './modules/music-services/track/track.module';
import { GenresModule } from './modules/music-services/genres/genres.module';
import { DataCollectModule } from './modules/beta-services/data-collect/data-collect.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LogoModule } from './modules/setting-services/logo/logo.module';
import { SocialLinksModule } from './modules/setting-services/social-links/social-links.module';
import { FaqModule } from './modules/setting-services/faq/faq.module';
import { SubscribersModule } from './modules/setting-services/subscribers/subscribers.module';
import { HomeSlideShowModule } from './modules/setting-services/home-slide-show/home-slide-show.module';
import { MusicCollectionsModule } from './modules/setting-services/music-collections/music-collections.module';
import { ProductCategoryModule } from './modules/product-services/product-category/product-category.module';
import { ProductsModule } from './modules/product-services/products/products.module';
import { AddressModule } from './modules/customer-services/address/address.module';
import { OrdersModule } from './modules/order-services/orders/orders.module';
import { CartModule } from './modules/product-services/cart/cart.module';
import { OrderItemsModule } from './modules/order-services/order-items/order-items.module';
import { CartItemsModule } from './modules/product-services/cart-items/cart-items.module';
import { PlatformsModule } from './modules/setting-services/platforms/platforms.module';
import { SocialMediaLinksModule } from './modules/setting-services/social-media-links/social-media-links.module';
import { ArtistModule } from './modules/user-services/artist/artist.module';
import { StripeModule } from './modules/payment-services/stripe/stripe.module';
import { ExchangeRateModule } from './modules/setting-services/exchange-rate/exchange-rate.module';
import { ProductAttributeModule } from './modules/product-services/product-attribute/product-attribute.module';
import { ProductAttributeValueModule } from './modules/product-services/product-attribute-value/product-attribute-value.module';
import { ProductVariationModule } from './modules/product-services/product-variation/product-variation.module';
import { ApiTokenModule } from './modules/auth-services/api-token/api-token.module';
import { AlbumModule } from './modules/music-services/album/album.module';
import { MusicLinkModule } from './modules/music-services/music-link/music-link.module';
import { PopularTracksModule } from './modules/music-services/popular-tracks/popular-tracks.module';
import { FeaturedArtistsModule } from './modules/music-services/featured-artists/featured-artists.module';
import { CustomerModule } from './modules/user-services/customer/customer.module';
import { FeaturedProductsModule } from './modules/product-services/featured-products/featured-products.module';
import { StripeWebhookController } from './stripe/stripe-webhook/stripe-webhook.controller';
import { StripeWebhookModule } from './stripe/stripe-webhook/stripe-webhook.module';
import { DingerModule } from './modules/payment-services/dinger/dinger.module';
import { CollectionsModule } from './modules/music-services/collections/collections.module';
import { CheckoutModule } from './modules/payment-services/checkout/checkout.module';
import { PaymentLogModule } from './modules/payment-services/payment-log/payment-log.module';
import { DingerLogModule } from './modules/payment-services/dinger-log/dinger-log.module';
import { StripeLogModule } from './modules/payment-services/stripe-log/stripe-log.module';
import { OrderLogModule } from './modules/order-services/order-log/order-log.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig,]
    }),

    TypeOrmModule.forRootAsync({
      inject: [postgresConfig.KEY],
      useFactory: (config: ConfigType<typeof postgresConfig>) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        autoLoadEntities: true,
        synchronize: config.sync as boolean, // ❗ Only for development
      }),
    }),

    LoggerModule,
    TokenModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    UserProfileModule,
    MediaModule,
    TrackModule,
    GenresModule,
    DataCollectModule,
    LogoModule,
    SocialLinksModule,
    FaqModule,
    SubscribersModule,
    HomeSlideShowModule,
    MusicCollectionsModule,
    ProductCategoryModule,
    ProductsModule,
    AddressModule,
    OrdersModule,
    CartModule,
    OrderItemsModule,
    CartItemsModule,
    PlatformsModule,
    SocialMediaLinksModule,
    ArtistModule,
    StripeModule,
    ExchangeRateModule,
    ProductAttributeModule,
    ProductAttributeValueModule,
    ProductVariationModule,
    ApiTokenModule,
    AlbumModule,
    MusicLinkModule,
    PopularTracksModule,
    FeaturedArtistsModule,
    CustomerModule,
    FeaturedProductsModule,
    StripeWebhookModule,
    DingerModule,
    CollectionsModule,
    CheckoutModule,
    PaymentLogModule,
    DingerLogModule,
    StripeLogModule,
    OrderLogModule,
  ],
  controllers: [AppController, StripeWebhookController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly winstonLogger: WinstonLoggerService
  ) { }

  async onModuleInit() {
    this.winstonLogger.info('🎉 Connected to PostgreSQL')
    // this.winstonLogger.info('🎉 Connected to MongoDB')
    // this.winstonLogger.info('🎉 Connected to Redis')
  }
}
