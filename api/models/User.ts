import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { HydratedDocument, model, Model, Schema } from 'mongoose';
import { IUser } from '../types';

const SALT_WORK_FACTOR = 10;

interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<IUser>, username: string) {
        if (!this.isModified('username')) return true;
        const user = await User.findOne({ username });

        if (user) return false;
      },
      message: 'This user is already registered',
    },
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  googleID: String,
  facebookID: String,
  avatar: String,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

const User = model<IUser, UserModel>('User', UserSchema);

export default User;
