// lib
import { Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompressionService } from 'src/common/compression/compression.service';
import { ConfigService } from 'src/common/config/config.service';

@ApiTags('Encryption')
@Controller('/encryption-keys')
export class ControllersController {
  constructor(
    private readonly configService: ConfigService,
    private readonly compressionService: CompressionService,
  ) {}

  @Post('/')
  async getAppEncryptionKey() {
    try {
      const compressedEncryptionKey = await this.compressionService.compress(
        this.configService.get('APP_ENCRYPTION_KEY'),
      );

      return {
        status: 200,
        encryption_key: compressedEncryptionKey,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message || 'Failed to fetch application encryption key',
      };
    }
  }
}
