/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '@schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { SALT_OR_ROUNDS } from '@common/constants/user.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) { }

  async findOne(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email }).lean();
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user;
      }
    }
    return null;
  }
  async insert(email: string, password: string): Promise<User> {
    const hashPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);
    const employee = new this.userModel({ email: email, password: hashPassword });
    await employee.save();
    return employee;
  }
  async delete(email: string) {
    await this.userModel.deleteMany({ email: email });
  }
  async createUserIfNotExist(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email }).lean();
    if (!user) {
      return await this.insert(email,password);
    }
    return user;
  }
}
