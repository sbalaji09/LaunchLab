import React, { useState, useRef, useEffect } from "react";

function MainScreen() {
  const allCategories = [
    "Web Development",
    "Mobile Apps",
    "AI / Machine Learning",
    "Blockchain",
    "Productivity",
    "Health",
    "Finance",
    "Education",
    "E-commerce",
    "Social Media",
    "Travel",
    "Music",
    "Gaming",
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
        setIsInputFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter categories excluding selected and matching input
  const filteredCategories = allCategories.filter(
    (cat) =>
      cat.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedCategories.includes(cat)
  );

  const addCategory = (category) => {
    setSelectedCategories([...selectedCategories, category]);
    setInputValue("");
    setShowDropdown(false);
  };

  const removeCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (!selectedCategories.includes(inputValue.trim())) {
        addCategory(inputValue.trim());
      }
      e.preventDefault();
    } else if (e.key === "Backspace" && inputValue === "" && selectedCategories.length) {
      removeCategory(selectedCategories[selectedCategories.length - 1]);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div style={styles.page}>
      {/* Background gradient elements */}
      <div style={styles.bgGradient1}></div>
      <div style={styles.bgGradient2}></div>
      <div style={styles.bgGradient3}></div>
      
      <div style={styles.container} ref={containerRef}>
        <div style={styles.headerSection}>
          <h1 style={styles.header}>What are you interested in building?</h1>
          <p style={styles.subheader}>
            Select categories that match your interests or create your own
          </p>
        </div>
        
        <div 
          style={{
            ...styles.inputContainer,
            ...(isInputFocused ? styles.inputContainerFocused : {}),
            ...(selectedCategories.length > 0 ? styles.inputContainerWithTags : {})
          }} 
          onClick={() => {
            setShowDropdown(true);
            setIsInputFocused(true);
          }}
        >
          {selectedCategories.map((cat, index) => (
            <div 
              key={cat} 
              style={{
                ...styles.tag,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <span>{cat}</span>
              <button
                style={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  removeCategory(cat);
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.closeButtonHover.backgroundColor;
                  e.target.style.color = styles.closeButtonHover.color;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#6b7280";
                }}
                aria-label={`Remove ${cat}`}
              >
                ×
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={selectedCategories.length === 0 ? "Type to search or create categories..." : "Add more..."}
            style={styles.input}
          />
        </div>

        {showDropdown && (
          <div 
            style={{
              ...styles.dropdown,
              animation: "fadeInUp 0.2s ease-out forwards"
            }}
          >
            {filteredCategories.length === 0 ? (
              <div style={styles.noResult}>
                {inputValue.trim() ? `Press Enter to create "${inputValue.trim()}"` : "Start typing to see suggestions"}
              </div>
            ) : (
              <>
                {inputValue.trim() && !allCategories.includes(inputValue.trim()) && (
                  <div
                    style={styles.createOption}
                    onClick={() => addCategory(inputValue.trim())}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <span style={styles.createIcon}>+</span>
                    Create "{inputValue.trim()}"
                  </div>
                )}
                {filteredCategories.map((cat, index) => (
                  <div
                    key={cat}
                    style={{
                      ...styles.dropdownItem,
                      animationDelay: `${index * 0.05}s`
                    }}
                    onClick={() => addCategory(cat)}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor;
                      e.target.style.transform = styles.dropdownItemHover.transform;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#f8fafc";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  bgGradient1: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
    animation: "float 6s ease-in-out infinite",
    zIndex: 0,
  },
  bgGradient2: {
    position: "absolute",
    bottom: "-30%",
    right: "-30%",
    width: "60%",
    height: "60%",
    background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)",
    animation: "float 8s ease-in-out infinite reverse",
    zIndex: 0,
  },
  bgGradient3: {
    position: "absolute",
    top: "20%",
    right: "10%",
    width: "300px",
    height: "300px",
    background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "float 10s ease-in-out infinite",
    zIndex: 0,
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "48px 40px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)",
    width: "100%",
    maxWidth: "600px",
    position: "relative",
    zIndex: 1,
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  headerSection: {
    textAlign: "center",
    marginBottom: "40px",
  },
  header: {
    margin: "0 0 16px 0",
    fontWeight: "700",
    fontSize: "32px",
    background: "linear-gradient(135deg, #1f2937 0%, #4b5563 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: "1.2",
  },
  subheader: {
    margin: 0,
    fontSize: "16px",
    color: "#6b7280",
    lineHeight: "1.5",
    fontWeight: "400",
  },
  inputContainer: {
    minHeight: "56px",
    border: "2px solid #e5e7eb",
    borderRadius: "16px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "12px 16px",
    gap: "8px",
    cursor: "text",
    fontSize: "16px",
    color: "#374151",
    backgroundColor: "#ffffff",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  inputContainerFocused: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  inputContainerWithTags: {
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  tag: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    color: "white",
    padding: "8px 16px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    userSelect: "none",
    boxShadow: "0 2px 4px rgba(59, 130, 246, 0.2)",
    animation: "slideInLeft 0.3s ease-out forwards",
    transition: "all 0.2s ease",
  },
  closeButton: {
    marginLeft: "8px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "1",
    color: "#dbeafe",
    padding: "2px 6px",
    borderRadius: "6px",
    userSelect: "none",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
  },
  closeButtonHover: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
  },
  input: {
    flex: 1,
    border: "none",
    fontSize: "16px",
    padding: "8px 0",
    outline: "none",
    minWidth: "140px",
    color: "#374151",
    backgroundColor: "transparent",
    fontWeight: "400",
  },
  dropdown: {
    marginTop: "12px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
    maxHeight: "280px",
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    width: "100%",
    position: "absolute",
    zIndex: 10,
    fontSize: "15px",
    color: "#374151",
    border: "1px solid #f3f4f6",
    backdropFilter: "blur(10px)",
  },
  createOption: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    color: "#166534",
    padding: "10px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    userSelect: "none",
    fontWeight: "500",
    border: "1px solid #bbf7d0",
    transition: "all 0.2s ease",
    animation: "fadeInUp 0.3s ease-out forwards",
    whiteSpace: "nowrap",
    width: "fit-content",
  },
  createIcon: {
    marginRight: "8px",
    fontSize: "18px",
    fontWeight: "600",
  },
  dropdownItem: {
    backgroundColor: "#f8fafc",
    color: "#475569",
    padding: "10px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    userSelect: "none",
    fontWeight: "500",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    animation: "fadeInUp 0.3s ease-out forwards",
    border: "1px solid #e2e8f0",
    whiteSpace: "nowrap",
    width: "fit-content",
  },
  dropdownItemHover: {
    backgroundColor: "#e0f2fe",
    transform: "translateY(-1px)",
  },
  noResult: {
    color: "#9ca3af",
    fontStyle: "normal",
    textAlign: "center",
    padding: "20px",
    fontSize: "14px",
    fontWeight: "400",
  },
};

export default MainScreen;