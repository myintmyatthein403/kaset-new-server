import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Track } from "../../track/entities/track.entity";
import { Platform } from "src/modules/setting-services/platforms/entities/platform.entity";
import { IsNotEmpty, IsString } from "class-validator";
import { CreditKey } from "../../credit-keys/entities/credit-key.entity";

@Entity('credit-values')
export class CreditValue extends BaseEntity {
  @ManyToOne(() => Track, track => track.credit_values)
  @JoinColumn({ name: 'track_id' })
  track: Track;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ManyToOne(() => CreditKey, creditKey => creditKey.credit_values, { eager: true })
  @JoinColumn({ name: 'credit_value_id' })
  credit_key: CreditKey
}
