
import {
  savePlan,
} from 'services/plan/plan.service';

export const PersistPlan = (req, res) => {
    const data = req.body;
    if (data) {
        savePlan(data)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            throw new Error(err.message);
        })
    } else {
        throw new Error('Request body is empty');
    }
};
