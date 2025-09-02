import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>) { }
  create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find()
  }

  async remove(id: string) {
    const result = await this.productRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }
}
