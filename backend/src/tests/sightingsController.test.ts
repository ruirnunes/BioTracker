import { createSighting } from '../controllers/sightingsController.js';

describe('createSighting (basic test)', () => {
  it('should return 401 if no token is provided', async () => {
    const req: any = {
      headers: {},
      body: {}
    };

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));

    const res: any = { status, json };

    await createSighting(req, res);

    expect(status).toHaveBeenCalledWith(401);
  });
});