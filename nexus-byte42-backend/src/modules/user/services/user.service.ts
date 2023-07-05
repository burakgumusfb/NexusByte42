import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findOne(email: string, password: string): Promise<User> {
    return this.userModel.findOne({ email: email, password: password }).lean();
  }
  async insert(email: string, password: string) {
    const employee = new this.userModel({ email: email, password: password });
    await employee.save();
  }
}
