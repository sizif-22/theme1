"use client";
import { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    routeName: "",
    organizationName: "",
    eventTitle: "",
    eventLocation: "",
    eventDate: "",
    eventTime: "",
    description: "",
    facebookLink: "",
    twitterLink: "",
    instagramLink: "",
    linkedinLink: "",
    email: "",
    phoneNumber: "",
    locations: [],
    quickButtons: [],
  });

  const [locations, setLocations] = useState([""]);
  const [quickButtons, setQuickButtons] = useState([""]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error for this field when the user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleLocationChange = (index, value) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

  const handleQuickButtonChange = (index, value) => {
    const newQuickButtons = [...quickButtons];
    newQuickButtons[index] = value;
    setQuickButtons(newQuickButtons);
  };

  const addLocation = () => {
    setLocations([...locations, ""]);
  };

  const addQuickButton = () => {
    setQuickButtons([...quickButtons, ""]);
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "routeName",
      "organizationName",
      "eventTitle",
      "eventLocation",
      "eventDate",
      "eventTime",
      "email",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const finalFormData = {
        ...formData,
        locations: locations.filter((location) => location.trim() !== ""),
        quickButtons: quickButtons.filter((button) => button.trim() !== ""),
      };
      console.log(finalFormData);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const renderField = (name, label, type = "text", required = false) => (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={name}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={name == "organizationName"? "Masons" : name}
        required={required}
        style={{
          display: "block",
          width: "100%",
          padding: "0.5rem",
          border: errors[name] ? "1px solid red" : "1px solid #ccc",
        }}
      />
      {errors[name] && (
        <div style={{ color: "red", fontSize: "0.8rem" }}>{errors[name]}</div>
      )}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      {renderField("routeName", "Route Name", "text", true)}
      {renderField(
        "organizationName",
        "Organization/Company Name",
        "text",
        true
      )}
      {renderField("eventTitle", "Event Title", "text", true)}
      {renderField("eventLocation", "Where is the event?", "text", true)}
      {renderField("eventDate", "Event Date", "date", true)}
      {renderField("eventTime", "Event Time", "time", true)}

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
          }}
          placeholder="Description"
          className=" border border-gray-300"
        />
      </div>

      {renderField("facebookLink", "Facebook Link", "url")}
      {renderField("twitterLink", "Twitter Link", "url")}
      {renderField("instagramLink", "Instagram Link", "url")}
      {renderField("linkedinLink", "LinkedIn Link", "url")}
      {renderField("email", "Email", "email", true)}
      {renderField("phoneNumber", "Phone Number", "tel")}

      <div style={{ marginBottom: "1rem" }}>
        <label>Locations</label>
        {locations.map((location, index) => (
          <input
            key={index}
            value={location}
            onChange={(e) => handleLocationChange(index, e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
            }}
            placeholder={`Location ${index + 1}`}
          />
        ))}
        <button
          type="button"
          onClick={addLocation}
          style={{ padding: "0.5rem", marginTop: "0.5rem" }}
        >
          Add Location
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Quick Buttons</label>
        {quickButtons.map((button, index) => (
          <input
            key={index}
            value={button}
            onChange={(e) => handleQuickButtonChange(index, e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
            }}
            placeholder={`Quick Button ${index + 1}`}
          />
        ))}
        <button
          type="button"
          onClick={addQuickButton}
          style={{ padding: "0.5rem", marginTop: "0.5rem" }}
        >
          Add Quick Button
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <button type="button" style={{ padding: "0.5rem 1rem" }}>
          Cancel
        </button>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Save
        </button>
      </div>
    </form>
  );
};

export default EventForm;
