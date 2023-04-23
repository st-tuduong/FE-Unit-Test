import { User } from '@app/core/models/User';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getListUser } from '../user.action';

const UserList = () => {
  const dispatch = useDispatch();
  const { userList, isLoading, hasError } = useSelector(
    (state: any) => state.userReducer
  );
  const [users, setUsers] = useState(userList);

  const handleRemoveUser = (id) => {
    setUsers((prevState) =>
      prevState.filter((prevItem) => prevItem.id !== id)
    );
  };

  useEffect(() => {
    dispatch(getListUser());
  }, []);

  useEffect(() => {
    setUsers(userList);
  }, [userList]);

  return isLoading ? (
    <span data-testid="loading">
      ...Loading
    </span>
  ) : (
    <div className="container list-user">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Company</th>
            <th>Website</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item: User) => (
            <tr key={item.id}>
              <td data-testid="user">{item.id}</td>
              <td>
                <Link
                  data-testid={`user-link-${item.id}`}
                  to={`/user/${item.id}`}
                >
                  {item.name}
                </Link>
              </td>
              <td>{item.company.name}</td>
              <td>{item.website}</td>
              <td>{`${item.address.street}, ${item.address.city}`}</td>
              <td className="user-remove">
                <button
                  data-testid={`btn-remove-${item.id}`}
                  onClick={() => handleRemoveUser(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {hasError && <p role="alert">Oops, failed to fetch!</p>}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
