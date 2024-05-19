export const prismaClientMock = {
  emails: {
    create: jest.fn().mockResolvedValue({
      id: 1,
    }),
  },
};
