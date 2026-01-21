# Steps to Add ESI Number and ESI Document Upload to StaffApplicationForm.jsx

## Overview
Add ESI (Employee State Insurance) Number input field and ESI Document upload functionality to the Financial Details section of the StaffApplicationForm.jsx component.

## Step 1: Update formData State
Add the following fields to the initial formData state object:

```javascript
// Add these lines to the formData state initialization
ESINo: "",
ESIDocument: null,
```

## Step 2: Add ESI Fields to Financial Details Section
In the Financial Details section (around line 2500+), after the GPF fields, add the ESI fields:

```javascript
{/* ESI No */}
<div className="w-full">
  <InputField
    name="ESINo"
    value={formData.ESINo}
    onChange={handleInputChange}
    placeholder="ESI Number"
    error={errors.ESINo}
    label="ESI Number"
  />
  <div className="flex justify-between">
    <label className="block text-sm text-gray-700 mb-2 mt-2">
      ESI Document Upload
    </label>
    {formData.ESIDocument && (
      <button
        type="button"
        onClick={() =>
          window.open(URL.createObjectURL(formData.ESIDocument))
        }
        className="text-blue-600 hover:underline text-sm mt-2"
      >
        View
      </button>
    )}
  </div>
  <div className="relative">
    <input
      type="file"
      accept="image/*,.pdf"
      onChange={handleESIUpload}
      className="hidden"
      id="esi-upload"
    />
    <label
      htmlFor="esi-upload"
      className={`flex items-center border rounded-xl w-full text-sm transition-all cursor-pointer overflow-hidden ${
        errors.ESIDocument
          ? "border-red-500"
          : "border-gray-300 hover:border-blue-500"
      }`}
    >
      <span className="bg-blue-600 text-white px-4 py-2.5 text-sm font-medium whitespace-nowrap">
        Choose File
      </span>
      <span className="flex-1 px-3 py-2.5 text-gray-600 text-sm truncate border-l border-gray-300">
        {formData.ESIDocument
          ? formData.ESIDocument.name
          : "No file chosen"}
      </span>
    </label>
  </div>

  {errors.ESIDocument && (
    <p className="text-red-500 text-sm mt-1 flex items-center">
      <AlertCircle className="w-4 h-4 mr-1 inline shrink-0" />
      <span className="ml-1">{errors.ESIDocument}</span>
    </p>
  )}
</div>
```

## Step 3: Add ESI Upload Handler Function
Add the following function alongside other upload handlers (around line 400):

```javascript
const handleESIUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Validate file type
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setErrors((prev) => ({
        ...prev,
        ESIDocument: "Please upload an image or PDF file.",
      }));
      return;
    }
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        ESIDocument: "File size should be less than 5MB.",
      }));
      return;
    }

    // Set the file
    setFormData((prev) => ({
      ...prev,
      ESIDocument: file,
    }));
    setErrors((prev) => ({ ...prev, ESIDocument: undefined }));
  }
};
```

## Step 4: Update Form Submission
In the handleSubmit function, ensure ESIDocument is appended to formDataToSend:

```javascript
if (formData.ESIDocument) {
  formDataToSend.append("ESIDocument", formData.ESIDocument);
}
```

## Step 5: Update Validation (Optional)
If ESI is required, add it to the requiredFields array in validateForm function:

```javascript
// Add to requiredFields if ESI is mandatory
"ESINo",
"ESIDocument",
```

## Step 6: Update Form Reset (Optional)
In the success submission reset, add:

```javascript
ESINo: "",
ESIDocument: null,
```

## Notes
- Place the ESI fields in the Financial Details section after GPF fields
- The upload handler follows the same pattern as other document uploads
- File validation allows images and PDFs, max 5MB
- View button appears when a file is selected
- Error handling is consistent with other fields
