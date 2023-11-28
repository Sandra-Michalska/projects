export default function Input({ label, textarea, ...props }) {
    const classes = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    return (
        <p>
            <label>{label}</label>
            {textarea 
                ? <textarea className={classes} { ...props } /> 
                : <input className={classes} { ...props } />
            }
        </p>
    );
}