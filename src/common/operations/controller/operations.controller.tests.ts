import { Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { OperationsServiceMockFactory } from '../../../../test/utils/operations.service.mock';
import { ValidationServiceMockFactory } from '../../../../test/utils/validation.service.mock';
import { GuardianService } from '../../guardian';
import { ValidationService } from '../../validation';
import { OperationsService } from '../service/operations.service';

import { OperationsController } from './operations.controller';

export const OperationsControllerTestsFactory = <T extends Type>(
  ControllerClass: Type<OperationsController<InstanceType<T>, any>>,
  ServiceClass: Type<OperationsService<InstanceType<T>, never>>,
) => {
  describe(`${ControllerClass.name}`, () => {
    let controller: OperationsController<InstanceType<T>, any>;
    let service: OperationsService<T, never>;

    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [ControllerClass],
        providers: [
          GuardianService,
          {
            provide: ServiceClass,
            useValue: OperationsServiceMockFactory(),
          },
          {
            provide: ValidationService,
            useFactory: ValidationServiceMockFactory,
          },
        ],
      }).compile();

      service = module.get(ServiceClass);
      controller = module.get(ControllerClass);
      controller.onModuleInit();
    });

    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should call service.create when creating an entity', async () => {
      await controller.create({});
      expect(service.create).toHaveBeenCalled();
    });

    it('should call service.findAll when retriving entities', async () => {
      await controller.findAll({} as never);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should call service.findOne when retrieving an entity', async () => {
      await controller.findOne('');
      expect(service.findOne).toHaveBeenCalled();
    });

    it('should call service.update when updating an entity', async () => {
      await controller.update('', {});
      expect(service.update).toHaveBeenCalled();
    });

    it('should call service.remove when removing an entity', async () => {
      await controller.remove('');
      expect(service.remove).toHaveBeenCalled();
    });
  });
};
