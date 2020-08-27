import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1233456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1233456');
  });

  it('should no be able to create two appointment on the same time', async () => {
    const appointmentdate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentdate,
      provider_id: '1233456',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentdate,
        provider_id: '1233456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
