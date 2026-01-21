
Step-1: Add State for Step + Total Steps

Place at top of your component, just after useState(...):

const [currentStep, setCurrentStep] = useState(1);
const totalSteps = 5;

✅ Step-2: Add Progress Bar

Place this right below the form header section, before <form>:

<div className="px-10 mt-6">
  <div className="w-full bg-gray-200 h-2 rounded-full">
    <div
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
    />
  </div>
  <p className="text-center text-gray-600 text-sm mt-2">
    Step {currentStep} of {totalSteps}
  </p>
</div>

✅ Step-3: Wrap Sections in Step Conditions

Now you wrap your existing sections like this (no changes inside):

Step 1
{currentStep === 1 && (
  <>
    {/* Candidate Information Section (your existing code here) */}
  </>
)}

Step 2
{currentStep === 2 && (
  <>
    {/* Parent / Spouse Information Section (your existing pink & blue boxes) */}
  </>
)}

Step 3
{currentStep === 3 && (
  <>
    {/* Address Section (Current + Permanent Address) */}
  </>
)}

Step 4
{currentStep === 4 && (
  <>
    {/* Education + Experience + Achievements */}
  </>
)}

Step 5
{currentStep === 5 && (
  <>
    {/* Financial Details + Documents + Agree Terms + Submit Button */}
  </>
)}

✅ Step-4: Add Back / Next / Submit Buttons

Place this once at bottom of the <form>, not inside any step:

<div className="flex justify-between mt-10">
  {currentStep > 1 ? (
    <button
      type="button"
      onClick={() => setCurrentStep(currentStep - 1)}
      className="bg-gray-300 px-6 py-2 rounded-xl"
    >
      Back
    </button>
  ) : (
    <div></div>
  )}

  {currentStep < totalSteps ? (
    <button
      type="button"
      onClick={() => setCurrentStep(currentStep + 1)}
      className="bg-blue-600 text-white px-6 py-2 rounded-xl"
    >
      Next
    </button>
  ) : (
    <button
      type="submit"
      className="bg-green-600 text-white px-6 py-2 rounded-xl"
    >
      Submit
    </button>
  )}
</div>









































# TODO: Implement Multi-Step Form in StaffApplicationForm.jsx

## Step 1: Add State for Step + Total Steps
- Add `const [currentStep, setCurrentStep] = useState(1);` and `const totalSteps = 5;` after useState declarations.

## Step 2: Add Progress Bar
- Place progress bar div right below the form header section, before <form>.

## Step 3: Wrap Sections in Step Conditions
- Wrap Candidate Information Section in `{currentStep === 1 && (...)}`
- Wrap Parent / Spouse Information Section in `{currentStep === 2 && (...)}`
- Wrap Address Section (Current + Permanent Address) in `{currentStep === 3 && (...)}`
- Wrap Education + Experience + Achievements in `{currentStep === 4 && (...)}`
- Wrap Financial Details + Documents + Agree Terms + Submit Button in `{currentStep === 5 && (...)}`

## Step 4: Add Back / Next / Submit Buttons
- Place the navigation buttons at the bottom of the <form>, outside any step conditions.
- Handle Back, Next, and Submit logic appropriately.
