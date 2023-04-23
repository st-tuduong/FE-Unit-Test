import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserInfor } from '../user.action';
// import Loading from '@app/shared/components/Loading';

const User = () => {
  const dispatch = useDispatch();
  const { userInfor, isLoading, hasError } = useSelector((state: any) => state.userReducer);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserInfor(id));
  }, []);

  return isLoading ? <span data-testid="loading" className="loading-indicator">
      ...Loading
    </span> : (
    <div className="user" data-testid="user-infor">
      <p>{userInfor?.name}</p>
      <p>{userInfor?.company?.name}</p>
      {hasError && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  );
};

export default User;
