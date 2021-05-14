import React from 'react';
const tiposDeEntrada = {
  email: {
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    mensagem: 'Preencha um email válido.',
  },
  number: {
    regex: /^\d+$/,
    mensagem: 'Insira apenas números.',
  },
};

const useForm = (tipo) => {
  const [value, setValue] = React.useState('');
  const [erro, setErro] = React.useState(null);

  function validar(value) {
    if (tipo === false) return true;
    if (value.length === 0) {
      setErro('Preencha um valor');
      return false;
    } else if (
      tiposDeEntrada[tipo] &&
      !tiposDeEntrada[tipo].regex.test(value)
    ) {
      setErro(tiposDeEntrada[tipo].mensagem);
      return false;
    }
    setErro(null);
    return true;
  }
  function onChange({ target }) {
    if (erro) validar(value);
    setValue(target.value);
  }
  return {
    value,
    setValue,
    onChange,
    erro,
    validar: () => validar(value),
    onBlur: () => validar(value),
  };
};

export default useForm;
