import 'dotenv/config';
import { startServer } from './server';
import { SERVER_ERROR_START_MESSAGE } from './constants/messages';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    await startServer(PORT);
  } catch (error) {
    console.error(SERVER_ERROR_START_MESSAGE);
    process.exit(1);
  }
}

bootstrap();
