import { PrismaClient, User, Role } from "@prisma/client";
import { NotImplementedException } from "@nestjs/common";

export class UserService {
  constructor(private readonly prismaService: PrismaClient) {
  }

  async getUser(id: number): Promise<User> {
    throw NotImplementedException;
  }

  async addUser(email: string, name: string, country: string | null): Promise<User> {
    throw NotImplementedException;
  }

  async changeRole(id: number, role: Role): Promise<boolean> {
    throw NotImplementedException;
  }
}