import React, { useState } from 'react';
import { Hint } from 'react-autocomplete-hint';

const AutoComplete = (props) => {
  const [user, setUser] = useState('');
  const [group, setGroup] = useState('');
  const [error, setError] = useState('');

  const submitLoad = (e) => {
    e.preventDefault();
    const foundGroup = props.groupsList.find(e => e.toLowerCase() === group.toLowerCase());
    const foundUser = props.usersList.find(e => e.toLowerCase() === user.toLowerCase());

    if (group && !foundGroup) {
      setError('There is no such group in the list: ' + group);
    }
    else if (user && !foundUser) {
      setError('There is no such user in the list: ' + user);
    }
    else {
      setError('');
      props.submitLoad(group.toLowerCase(), user);
    };
  };

  const submitClear = () => {
    setError('');
    props.submitClear();
    setUser('');
    setGroup('');
  };

  return (
    <div className="content-container">
      <form className="selectors" onSubmit={submitLoad}>
        <Hint options={props.groupsList} allowTabFill={true}>
          <input
            className="selectors__item"
            value={group}
            placeholder={props.phGroup}
            onChange={e => setGroup(e.target.value)} />
        </Hint>
        <Hint options={props.usersList} allowTabFill={true}>
          <input
            className="selectors__item"
            value={user}
            placeholder={props.phUser}
            onChange={e => setUser(e.target.value)} />
        </Hint>
        <button className="selectors__item">Load selected</button>
        {props.state && <button className="selectors__item" onClick={submitClear}>Clear</button>}
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AutoComplete;
