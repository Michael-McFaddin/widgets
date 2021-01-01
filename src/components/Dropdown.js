import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyCLick = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener('click', onBodyCLick);

    return () => {
      document.body.removeEventListener('click', onBodyCLick);
    };
  }, []);

  const renderedOptions = options.map(option => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div 
        key={option.value} 
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  // console.log(ref.current);

  return (
    <div>
      <div ref={ref} className="ui form">
        <div className="field">
          <label className="label">{label}</label>
          <div 
            onClick={() => setOpen(!open)}
            className={`ui selection dropdown ${open ? 'visible active' : ''}`}
          >
            <i className="icon"></i>
            <div className="text">{selected.label}</div>
            <div className={`menu ${open ? 'visible transition' : ''}`}>
              {renderedOptions}
            </div>
          </div>
        </div>
      </div>
      {/* <h3 style={{ color: `${selected.value}`}}>This is colored text!</h3> */}
    </div>
  );
}

export default Dropdown;