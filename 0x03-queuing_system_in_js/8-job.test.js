import { expect } from 'chai';
import sinon from 'sinon';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queueMock;

  beforeEach(() => {
    const jobInstance = {
      on: sinon.stub().returnsThis(),
      save: sinon.stub()
    };

    queueMock = {
      create: sinon.stub().returns(jobInstance),
      save: sinon.stub()
    };
  });

  it('throws an error if jobs is not an array', () => {
    const invalidJobs = 'not an array';
    expect(() => createPushNotificationsJobs(invalidJobs, queueMock)).to.throw(
      'Jobs is not an array'
    );
  });
});
