import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let createAppointmentService: CreateAppointmentService;

let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '12345',
      provider_id: '1233456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1233456');
  });

  it('should no be able to create two appointments on the same time', async () => {
    // jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    //   return new Date(2020, 4, 10, 12).getTime();
    // });

    const appointmentdate = new Date(2020, 10, 20, 16);

    await createAppointmentService.execute({
      date: appointmentdate,
      user_id: '12345',
      provider_id: '1233456',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentdate,
        user_id: '12345',
        provider_id: '1233456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments os a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '12345',
        provider_id: '1233456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '12345',
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
