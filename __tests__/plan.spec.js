
const { closeConnection, connectToDb } = require('../lib/connect');
const expect = require('expect');

const { savePLanImp, getPlanImp, updatePlanImp, removePlanImp } = require('../services/plan/plan.service.imp');

describe("Plans Crud", function(){
    let planId;
    const planData = {
        title: 'myplan',
        description: 'real nice plan',
    };

    it("Should save plans details", (done) => {
        savePLanImp(planData)
        .then(plan => {
            expect(plan).toHaveProperty('_id');
            expect(plan).toHaveProperty('title');
            expect(plan).toHaveProperty('description');

            expect(plan.title).toBe(planData.title);
            expect(plan.description).toBe(planData.description);
            planId = plan._id;
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it("Should get plan by Id", (done) => {
        getPlanImp(planId)
        .then(plan => {
            expect(plan).toHaveProperty('_id');
            expect(plan).toHaveProperty('title');
            expect(plan).toHaveProperty('description');

            expect(plan.title).toBe(planData.title);
            expect(plan.description).toBe(planData.description);
            planId = plan._id;
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it("Should update plan by Id", (done) => {
        const newTitle = 'new plan title';

        updatePlanImp(planId, { title: newTitle })
        .then(plan => {
            expect(plan).not.toBeNull();
            expect(plan.ok).toBe(1);
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it("Should remove Plan by Id", (done) => {
        removePlanImp(planId)
        .then(plan => {
            expect(plan).not.toBeNull();
            expect(plan.ok).toBe(1);
            done();
        })
        .catch(err => {
            done(err);
        });
    });
 });
