
import { motion } from "framer-motion";
import { useLogin } from "../../../../hooks/auth/use-login";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { FormError } from "../../../../components/ui/error-mesage";
import { CustomButton } from "../../../../components/ui/custom-button";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from '../../../../store/use-auth-store';

interface LoginFormData {
  email: string;
  password: string;
}


export const LoginPage = () => {
  const { mutate: login, isPending, isError } = useLogin();
  const loginUser = useAuthStore(state => state.loginUser)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData): void => {
    login(data, {
      onSuccess: (res) => {
        loginUser(res.user, res.token)
        navigate("/ecommerce")
      },
    });
  };

  return (
    <div className="flex items-start justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-lg lg:text-3xl font-semibold text-center">Iniciar Sesión</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label>Email</label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  {...register("email", {
                    required: "El email es obligatorio",
                  })}
                />
                {errors.email && (
                  <FormError message={errors.email.message} />
                )}
              </div>

              <div className="space-y-2">
                <label>Contraseña</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                  })}
                />
                {errors.password && (
                  <FormError message={errors.password.message} />
                )}
              </div>

              <CustomButton
                loading={isPending}
                label="Ingresar"
                type="submit"
                className="w-full"
              />
            </form>

            <p className="text-center text-sm text-gray-500">
              ¿No tenés cuenta?
              <Link
                to="/auth/register"
                className="text-blue-600 ml-1 hover:underline"
              >
                Crear una
              </Link>
            </p>
          </CardContent>
        </Card>

        {isError && (
          <FormError
            className="mt-3 justify-center"
            message="Credenciales Invalidas"
          />
        )}
      </motion.div>
    </div>
  );
};