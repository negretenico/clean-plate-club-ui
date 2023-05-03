import { type UUID } from 'crypto';

interface User {
  'current_goals': string
  'email': string
  'id': string | UUID
  'name': string
  'past_goals': string
  'trainer': string
}
export default User;
