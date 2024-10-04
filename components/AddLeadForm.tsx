import { useForm } from "react-hook-form";
import { supabase } from '../../../lib/supabaseClient';

interface LeadFormInputs {
  name: string;
  email: string;
  budget: number;
  // ... other fields
}

function AddLeadForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormInputs>();

  const onSubmit = async (data: LeadFormInputs) => {
    // Check for unique email
    const { data: existingLead } = await supabase
      .from('leads')
      .select('*')
      .eq('email', data.email)
      .single();
      
    if (existingLead) {
      // Handle duplicate email error
      return;
    }
    
    // Proceed with submission
    // ...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} placeholder="Name" />
      {errors.name && <span>Name is required</span>}
      
      <input {...register("email", { required: true })} placeholder="Email" />
      {errors.email && <span>Email is required</span>}
      
      <div className="mt-4">
        <label>Budget*</label>
        <input {...register("budget", { required: true })} placeholder="Budget" />
        {errors.budget && <span>Budget is required</span>}
      </div>
      
      {/* Tabs and Collapsible Sections */}
      {/* Implement using Shadcn UI Tabs */}
      
      <button type="submit">Add Lead</button>
    </form>
  );
}

export default AddLeadForm;