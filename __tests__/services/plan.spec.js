import planService from 'services/Plan/Plan.service';

describe('Plans Module', () => {
  it('Should succeffully add the plan', async () => {
    const PLAN = {
      title: 'plan title',
      description: 'plan description',
      status: 'Active',
      repoName: 'uuid-random-string',
    };
    const saveSpy = jest.spyOn(planService, 'savePlan').mockImplementation(() => PLAN);

    await planService.savePlan(PLAN);

    expect(saveSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalledWith(PLAN);
  });
});
