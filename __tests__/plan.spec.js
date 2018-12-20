
const expect = require('expect');

const {
  savePlan, getPlan, updatePlan, removePlan,
} = require('../src/services/Plan/Plan.service');

describe('Plans Crud', () => {
  let PlanId;
  const PlanData = {
    title: 'myPlan',
    description: 'real nice Plan',
  };

  it('Should save Plans details', (done) => {
    savePlan(PlanData)
      .then((Plan) => {
        expect(Plan).toHaveProperty('_id');
        expect(Plan).toHaveProperty('title');
        expect(Plan).toHaveProperty('description');

        expect(Plan.title).toBe(PlanData.title);
        expect(Plan.description).toBe(PlanData.description);
        PlanId = Plan._id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should get Plan by Id', (done) => {
    getPlan(PlanId)
      .then((Plan) => {
        expect(Plan).toHaveProperty('_id');
        expect(Plan).toHaveProperty('title');
        expect(Plan).toHaveProperty('description');

        expect(Plan.title).toBe(PlanData.title);
        expect(Plan.description).toBe(PlanData.description);
        PlanId = Plan._id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should update Plan by Id', (done) => {
    const newTitle = 'new Plan title';

    updatePlan(PlanId, { title: newTitle })
      .then((Plan) => {
        expect(Plan).not.toBeNull();
        expect(Plan.ok).toBe(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should remove Plan by Id', (done) => {
    removePlan(PlanId)
      .then((Plan) => {
        expect(Plan).not.toBeNull();
        expect(Plan.ok).toBe(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
