import { useId, useRef, useEffect } from 'react';
import { bool, string } from 'prop-types';
import { A11yHidden } from '@/components/A11yHidden/A11yHidden';
import style from './FormInput.module.scss';

/* Component ---------------------------------------------------------------- */

export function FormInput({
  label,
  type,
  invisibleLabel,
  vertical,
  ...restProps
}) {
  const id = useId();

  const inputRef = useRef(null);

  useEffect(() => {
    // 이벤트 연결 대상 참조
    const input = inputRef.current;
    const component = input.parentElement;

    // 이벤트 연결
    input.addEventListener('blur', (e) => {
      if (e.target.value.length > 0) {
        component.classList.add(style.inputed);
      } else {
        component.classList.remove(style.inputed);
      }
    });
  }, []);

  const combineClassNames = `${style.FormInput} ${
    vertical ? style.FormInputVertical : ''
  }`.trim();

  return (
    <div className={combineClassNames}>
      {renderLabel(id, label, invisibleLabel)}
      <input
        ref={inputRef}
        id={id}
        type={type}
        className={style.input}
        {...restProps}
      />
    </div>
  );
}

/* Props -------------------------------------------------------------------- */

FormInput.defualtProps = {
  type: 'text',
  invisibleLabel: false,
  vertical: false,
  inputed: false,
};

FormInput.propTypes = {
  type: string,
  label: string.isRequired,
  invisibleLabel: bool,
  vertical: bool,
  inputed: bool,
};

/* Render Function ---------------------------------------------------------- */

function renderLabel(id, label, invisibleLabel) {
  return invisibleLabel ? (
    <A11yHidden as="label" htmlFor={id} className={style.label}>
      {label}
    </A11yHidden>
  ) : (
    <label htmlFor={id} className={style.label}>
      {label}
    </label>
  );
}
