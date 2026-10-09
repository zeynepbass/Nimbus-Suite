import EmployeeDetails from "@/components/features/employees/EmployeeDetails";
import employees from "@/data/employees.json";

export default async function Page({ params }) {
  const { id } = await params;
  const employee = employees.find((item) => item.id === id);

  if (!employee) return <p className="p-6 text-center text-muted-foreground">Personel bulunamadı</p>;

  return <EmployeeDetails employee={employee} />;
}
