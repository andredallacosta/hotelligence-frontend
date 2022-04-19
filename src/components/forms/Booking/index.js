import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  FormControl,
  FormHelperText,
} from "@material-ui/core/";
import { Autocomplete } from "@material-ui/lab";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import brLocale from "date-fns/locale/pt-BR";

import { ButtonLoading } from "@Components/UI";
import api from "@Utils/api";
import { failure } from "Redux@Helpers";
import { getTotalBookingValue } from "@Utils/helpers";
import useStyles from "./styles";

export default function BookingForm(props) {
  const { booking, checkIn, onSuccess, onFail, room } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [guests, setGuests] = useState([]);

  const { selectedDate } = useSelector(
    (state) => state.platform.app,
    shallowEqual
  );

  const {
    handleSubmit,
    errors,
    control,
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      ...booking,
      start_date: booking?.start_date || selectedDate || new Date(),
      end_date:
        booking?.end_date ||
        (selectedDate
          ? new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)
          : new Date().setDate(new Date().getDate() + 1)),
      extras_value: booking?.extras_value || 0,
      daily_value: room?.value || 0,
    },
  });

  const watchStartDate = watch("start_date");
  const watchEndDate = watch("end_date");
  const watchDailyValue = watch("daily_value");
  const watchExtrasValue = watch("extras_value", 0);

  const saveBooking = (formData) => {
    if (formData.start_date > formData.end_date) {
      setError("startDateLessThanEndData", {
        type: "manual",
        message: "A data de entrada precisa ser menor que a data de saída",
      });
      return;
    }

    setLoading(true);
    const obj = {
      ...booking,
      ...formData,
      room: room?.id,
      guest: formData.guest.id,
      check_in: checkIn,
      start_date: new Date(formData.start_date),
      end_date: new Date(formData.end_date),
      checkIn,
    };
    if (booking?.id) {
      api.booking
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
              msg: "Não foi possível editar",
            })
          );
        });
    } else {
      api.booking
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
              msg: "Não foi possível criar",
            })
          );
        });
    }
  };

  const getGuests = () => {
    setLoading(true);
    api.guest
      .list()
      .then((response) => {
        setLoading(false);
        setGuests(response.data);
        if (booking?.guest) {
          setValue(
            "guest",
            response.data.find((guest) => booking?.guest.id === guest.id)
          );
        }
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          failure("", "error", {
            title: "Erro",
            msg: "Não foi possível obter os hóspedes",
          })
        );
      });
  };

  useEffect(() => {
    getGuests();
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        clearErrors();
        handleSubmit(saveBooking)();
      }}
      noValidate
    >
      <Grid container justifyContent="flex-start" spacing={2}>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth error={!!errors.guest}>
            <Controller
              rules={{ required: "Este campo é obrigatório" }}
              control={control}
              name="guest"
              render={(p) => (
                <Autocomplete
                  {...p}
                  options={guests}
                  onChange={(_, data) => p.onChange(data)}
                  loading={loading}
                  getOptionLabel={(option) =>
                    `${option.full_name || ""} ${
                      option.cpf ? `${option.cpf}` : ""
                    }`
                  }
                  getOptionSelected={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.guest}
                      label="Hóspede"
                      required
                      placeholder="Hóspede"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  )}
                />
              )}
            />
            {errors.guest ? (
              <FormHelperText error={!!errors.guest}>
                {errors.guest?.message || ""}
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl
            fullWidth
            variant="outlined"
            required
            error={!!errors.start_date}
          >
            <Controller
              rules={{ required: "Este campo é obrigatório" }}
              error={!!errors.start_date}
              helperText={errors.start_date?.message || false}
              control={control}
              disabled={loading}
              name="start_date"
              render={({ onChange, value }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
                  <KeyboardDatePicker
                    fullWidth
                    autoOk
                    error={!!errors.start_date}
                    disabled={loading}
                    ampm={false}
                    inputVariant="outlined"
                    variant="outlined"
                    format="dd/MM/yyyy"
                    label="Data de entrada"
                    value={value}
                    onChange={(v) => {
                      clearErrors();
                      onChange(v);
                    }}
                  />
                </MuiPickersUtilsProvider>
              )}
            />
            {errors.start_date || errors.startDateLessThanEndData ? (
              <FormHelperText
                error={!!errors.start_date || !!errors.startDateLessThanEndData}
              >
                {errors.start_date?.message ||
                  errors.startDateLessThanEndData?.message ||
                  ""}
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl
            fullWidth
            variant="outlined"
            required
            error={!!errors.end_date}
          >
            <Controller
              rules={{ required: "Este campo é obrigatório" }}
              error={!!errors.end_date}
              helperText={errors.end_date?.message || false}
              control={control}
              disabled={loading}
              name="end_date"
              render={({ onChange, value }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
                  <KeyboardDatePicker
                    fullWidth
                    autoOk
                    error={!!errors.end_date}
                    disabled={loading}
                    ampm={false}
                    inputVariant="outlined"
                    variant="outlined"
                    format="dd/MM/yyyy"
                    label="Data de saída"
                    value={value}
                    onChange={(v) => {
                      clearErrors();
                      onChange(v);
                    }}
                  />
                </MuiPickersUtilsProvider>
              )}
            />
            {errors.end_date ? (
              <FormHelperText error={!!errors.end_date}>
                {errors.end_date?.message || ""}
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            rules={{
              required: "Este campo é obrigatório",
            }}
            as={
              <TextField
                variant="outlined"
                label="Número de hóspedes"
                required
                fullWidth
              />
            }
            error={!!errors.guest_quantity}
            helperText={errors.guest_quantity?.message || false}
            control={control}
            disabled={loading}
            name="guest_quantity"
            type="number"
            defaultValue={1}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Número de diárias"
            required
            value={Math.ceil(
              (new Date(watchEndDate).getTime() -
                new Date(watchStartDate).getTime()) /
                (1000 * 3600 * 24)
            )}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            rules={{
              required: "Este campo é obrigatório",
            }}
            as={
              <TextField
                variant="outlined"
                label="Valor da diária"
                required
                fullWidth
                InputProps={{
                  startAdornment: "R$",
                }}
              />
            }
            error={!!errors.daily_value}
            helperText={errors.daily_value?.message || false}
            control={control}
            disabled={loading}
            name="daily_value"
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Valor total"
            required
            value={getTotalBookingValue({
              daily_value: watchDailyValue,
              extras_value: watchExtrasValue,
              start_date: watchStartDate,
              end_date: watchEndDate,
            })}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            rules={{
              required: "Este campo é obrigatório",
            }}
            as={
              <TextField
                variant="outlined"
                label="Valor pago"
                required
                fullWidth
                InputProps={{
                  startAdornment: "R$",
                }}
              />
            }
            error={!!errors.paid_value}
            helperText={errors.paid_value?.message || false}
            control={control}
            disabled={loading}
            name="paid_value"
            type="number"
            defaultValue={0}
          />
        </Grid>
        {checkIn ? (
          <Grid item xs={12} md={6}>
            <Controller
              rules={{
                required: "Este campo é obrigatório",
              }}
              as={
                <TextField
                  variant="outlined"
                  label="Valor dos extras"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: "R$",
                  }}
                />
              }
              error={!!errors.extras_value}
              helperText={errors.extras_value?.message || false}
              control={control}
              disabled={loading}
              name="extras_value"
              type="number"
            />
          </Grid>
        ) : null}
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
  room: PropTypes.object.isRequired,
  booking: PropTypes.object,
  checkIn: PropTypes.bool,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
};

BookingForm.defaultProps = {
  booking: {},
  checkIn: false,
  onSuccess: () => {},
  onFail: () => {},
};
