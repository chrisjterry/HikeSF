import * as TrailAPIUtil from '../util/trail_api_util';

export const RECEIVE_TRAILS = 'RECEIVE_TRAILS';
export const RECEIVE_TRAIL = 'RECEIVE_TRAIL';
export const RECEIVE_NEW_TRAIL = 'RECEIVE_NEW_TRAIL';
export const RECEIVE_TRAIL_ERRORS = 'RECEIVE_TRAIL_ERRORS';

const receiveTrails = trails => ({
    type: RECEIVE_TRAILS,
    trails
});

const receiveTrail = trail => ({
    type: RECEIVE_TRAIL,
    trail
});

const receiveNewTrail = trail => ({
    type: RECEIVE_NEW_TRAIL,
    trail
});

const receiveTrailErrors = errors => ({
    type: RECEIVE_TRAIL_ERRORS,
    errors
});

export const fetchTrails = data => dispatch => TrailAPIUtil.fetchAllTrails(data)
    .then(trails => dispatch(receiveTrails(trails)),
    errors => dispatch(receiveTrailErrors(errors)));

export const fetchTrail = id => dispatch => TrailAPIUtil.fetchOneTrail(id)
    .then(trail => dispatch(receiveTrail(trail)),
    errors => dispatch(receiveTrailErrors(errors)));

// export const fetchTrail = id => dispatch => TrailAPIUtil.fetchTrail(id)
//     .then(trail => dispatch(receiveTrail(trail)),
//     errors => dispatch(receiveTrailErrors(errors)));

export const createTrail = data => dispatch => TrailAPIUtil.createTrail(data)
    .then(trail => dispatch(receiveNewTrail(trail)),
    errors => dispatch(receiveTrailErrors(errors)));