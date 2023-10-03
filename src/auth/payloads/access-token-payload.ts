import { Types } from 'mongoose';
import { EUserRole } from '../enum';

export type ATPayload = {
  id: Types.ObjectId;
  role: EUserRole;
};
