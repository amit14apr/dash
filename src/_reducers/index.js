import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { loading } from './loading.reducer';
import { inventory } from './inventory.reducer';
import { commonProps } from './commonProps.reducer';
import { article } from './article.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    loading,
    inventory,
    commonProps,
    article,
});

export default rootReducer;