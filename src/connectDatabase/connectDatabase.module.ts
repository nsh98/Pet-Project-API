import { Module, Global } from '@nestjs/common';
import { ConnectDatabaseService } from './connectDatabase.service';

@Global()
@Module({
  providers: [ConnectDatabaseService],
  exports: [ConnectDatabaseService],
})
export class ConnectDatabaseModule {}
