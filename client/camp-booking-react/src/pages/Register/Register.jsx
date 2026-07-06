import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import authService from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

function Register() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await authService.register({
        FullName: data.fullName,
        Email: data.email,
        Password: data.password,
        ConfirmPassword: data.confirmPassword,
      });
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (err) {
      const data = err.response?.data;
      const message =
        data?.detail ||
        data?.message ||
        data?.title ||
        (data?.errors && Object.values(data.errors).flat().join(". ")) ||
        "Registration failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-100">
          <div className="mb-8 text-center">
            <Link to="/" className="mb-6 inline-block text-3xl">
              🏕
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Join thousands of happy campers
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              icon={<FiUser />}
              placeholder="John Doe"
              error={errors.fullName?.message}
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />

            <Input
              label="Email Address"
              type="email"
              icon={<FiMail />}
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              icon={<FiLock />}
              placeholder="Min. 6 characters"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <Input
              label="Confirm Password"
              type="password"
              icon={<FiLock />}
              placeholder="Repeat your password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              className="mt-2"
            >
              {isSubmitting ? "Creating account…" : "Create Account"}
              {!isSubmitting && <FiArrowRight className="ml-2" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
