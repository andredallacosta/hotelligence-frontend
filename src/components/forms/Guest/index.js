/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import debouncePromise from "awesome-debounce-promise";
import InputMask from "react-input-mask";
import { cpf } from "cpf-cnpj-validator";
import { Grid, TextField } from "@material-ui/core/";

import { ButtonLoading } from "@Components/UI";
import { api, brasilAPI } from "@Utils";
import { failure } from "Redux@Helpers";
import useStyles from "./styles";

export default function BookingForm(props) {
  const { guest, onSuccess, onFail } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, control, clearErrors, register, setValue } =
    useForm({
      defaultValues: {
        ...guest,
        phone: guest.phone ? guest.phone.ddd + guest.phone.number : "",
        ...guest?.address,
      },
    });

  const checkEmailExists = async (email) =>
    new Promise((resolve) => {
      api.guest.check(email).catch((res) => {
        if (res.response.status === 404) {
          resolve(true);
        }
        resolve(false);
      });
    });

  const getCepInfos = (cepValue) => {
    brasilAPI.cep
      .get(cepValue)
      .then((res) => {
        setValue(
          "address1",
          res.data.street.trim() === "" ? "N/A" : res.data.street
        );
        setValue("district", res.data.neighborhood || "");
        setValue("city", res.data.city || "");
        setValue("state", res.data.state || "");
      })
      .catch(() => {});
  };

  const saveGuest = (formData) => {
    setLoading(true);
    const obj = {
      ...guest,
      ...formData,
      email: formData.email.toLowerCase(),
      phone: {
        ...(guest.phone || {}),
        ddi: "+55",
        ddd: formData.phone.replace(/[^0-9]/g, "").substring(0, 2),
        number: formData.phone.replace(/[^0-9]/g, "").substring(2, 11),
      },
      cpf: formData?.cpf.replace(/[^0-9]/g, ""),
      address: {
        ...(guest.address || {}),
        country: formData.country,
        address1: formData.address1,
        address2: formData.address2,
        state: formData.state,
        city: formData.city,
        district: formData.district,
        cep: formData.cep.replace(/[^0-9]/g, ""),
        number: formData.number,
      },
    };
    if (guest?.id) {
      api.guest
        .update(obj)
        .then((response) => {
          setLoading(false);
          onSuccess(response.data);
        })
        .catch((error) => {
          setLoading(false);
          onFail(error);
          dispatch(
            failure("", "error", {
              title: "Erro",
              msg: "Não foi possível editar o hóspede",
            })
          );
        });
    } else {
      api.guest
        .create(obj)
        .then((response) => {
          setLoading(false);
          onSuccess(response.data);
        })
        .catch((error) => {
          setLoading(false);
          onFail(error);
          dispatch(
            failure("", "error", {
              title: "Erro",
              msg: "Não foi possível criar o hóspede",
            })
          );
        });
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        clearErrors();
        handleSubmit(saveGuest)();
      }}
      noValidate
    >
      <Grid container justifyContent="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Controller
            rules={{ required: "Este campo é obrigatório" }}
            as={
              <TextField variant="outlined" label="Nome" required fullWidth />
            }
            error={!!errors.first_name}
            helperText={errors.first_name?.message || false}
            control={control}
            disabled={loading}
            name="first_name"
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            rules={{ required: "Este campo é obrigatório" }}
            as={
              <TextField
                variant="outlined"
                label="Sobrenome"
                required
                fullWidth
              />
            }
            error={!!errors.last_name}
            helperText={errors.last_name?.message || false}
            control={control}
            disabled={loading}
            name="last_name"
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="emailInput"
            inputRef={register({
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Forneça um email válido",
              },
              validate: debouncePromise(
                async (value) =>
                  value && !guest?.id
                    ? (await checkEmailExists(value)) || (
                        <>Email já cadastrado.</>
                      )
                    : true,
                1000
              ),
            })}
            inputProps={{ maxLength: 150 }}
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message || false}
            name="email"
            label="E-mail"
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            rules={{
              required: "Este campo é obrigatório",
              validate: {
                phoneLength: (value) =>
                  value.replace(/[^0-9]/g, "").length >= 10 ||
                  "O telefone deve ter no mínimo 8 dígitos",
              },
            }}
            name="phone"
            control={control}
            as={({ value, onChange, name }) => (
              <InputMask
                mask="(99) 99999-9999"
                value={value}
                onChange={onChange}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    id="phoneInput"
                    variant="outlined"
                    fullWidth
                    required
                    name={name}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || false}
                    type="text"
                    label="Telefone"
                  />
                )}
              </InputMask>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            rules={{
              required: "Este campo é obrigatório",
              validate: {
                minMaxNumber: (value) =>
                  value.replace(/[^0-9]/g, "").length === 11 ||
                  "O CPF deve conter 11 números",
                validateCPF: (value) =>
                  cpf.isValid(value.replace(/[^0-9]/g, "")) ||
                  "O CPF deve ser válido",
              },
            }}
            name="cpf"
            control={control}
            as={({ value, onChange, name }) => (
              <InputMask
                mask="999.999.999-99"
                value={value}
                onChange={onChange}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    variant="outlined"
                    fullWidth
                    required
                    name={name}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || false}
                    type="text"
                    label="CPF"
                  />
                )}
              </InputMask>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={<TextField variant="outlined" label="RG" fullWidth />}
            error={!!errors.rg}
            helperText={errors.rg?.message || false}
            control={control}
            disabled={loading}
            name="rg"
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            rules={{
              validate: (value) =>
                value
                  ? value.replace(/[^0-9]/g, "").trim().length === 8 ||
                    "O CEP deve conter 8 números"
                  : true,
            }}
            name="cep"
            control={control}
            defaultValue=""
            as={({ value, onChange, name }) => (
              <InputMask
                mask="99999-999"
                value={value}
                disabled={loading}
                onChange={(e) => {
                  const rawCep = e.target.value.replace(/[^0-9]/g, "").trim();
                  if (rawCep.length === 8) {
                    getCepInfos(rawCep);
                  }
                  onChange(e);
                }}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    variant="outlined"
                    fullWidth
                    name={name}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || false}
                    type="text"
                    label="CEP"
                  />
                )}
              </InputMask>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={<TextField variant="outlined" label="Rua" fullWidth />}
            error={!!errors.address1}
            helperText={errors.address1?.message || false}
            control={control}
            disabled={loading}
            name="address1"
            type="text"
            placeholder="Rua"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={<TextField variant="outlined" label="Complemento" fullWidth />}
            error={!!errors.address2}
            helperText={errors.address2?.message || false}
            control={control}
            disabled={loading}
            name="address2"
            type="text"
            placeholder="Complemento"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={<TextField variant="outlined" label="Bairro" fullWidth />}
            error={!!errors.district}
            helperText={errors.district?.message || false}
            control={control}
            disabled={loading}
            name="district"
            type="text"
            placeholder="Bairro"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={<TextField variant="outlined" label="Cidade" fullWidth />}
            error={!!errors.city}
            helperText={errors.city?.message || false}
            control={control}
            disabled={loading}
            name="city"
            type="text"
            placeholder="Cidade"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={<TextField variant="outlined" label="Estado" fullWidth />}
            error={!!errors.state}
            helperText={errors.state?.message || false}
            control={control}
            disabled={loading}
            name="state"
            type="text"
            placeholder="Estado"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={<TextField variant="outlined" label="País" fullWidth />}
            error={!!errors.country}
            helperText={errors.country?.message || false}
            control={control}
            disabled={loading}
            name="country"
            type="text"
            placeholder="País"
            defaultValue="Brasil"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={<TextField variant="outlined" label="Número" fullWidth />}
            error={!!errors.number}
            helperText={errors.number?.message || false}
            control={control}
            disabled={loading}
            name="number"
            type="text"
            placeholder="Número"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} className={classes.submitButtonGrid}>
          <ButtonLoading
            loading={loading}
            disabled={loading}
            color="primary"
            type="submit"
            className={classes.defaultButton}
          >
            Salvar
          </ButtonLoading>
        </Grid>
      </Grid>
    </form>
  );
}

BookingForm.propTypes = {
  guest: PropTypes.object,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
};

BookingForm.defaultProps = {
  guest: {},
  onSuccess: () => {},
  onFail: () => {},
};
