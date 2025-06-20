// Componente de pregunta individual con radio buttons y checkboxes
export const QuestionField = ({ question, index, value, onChange }) => {
  const commonCheckboxClasses = "w-4 h-4 text-indigo-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500";

  // Renderiza el input según el tipo de pregunta
  const renderInput = () => {
    switch (question.type) {
      case 'single':
        return (
          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={question._id}
                  value={option._id}
                  checked={value === option._id}
                  onChange={(e) => onChange(question._id, e.target.value)}
                  required
                  className={commonCheckboxClasses}
                />
                <span className="text-gray-700 dark:text-gray-300">{option.text}</span>
              </label>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  value={option._id}
                  checked={value?.includes(option._id) || false}
                  onChange={(e) => {
                    const currentValues = value || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option._id]
                      : currentValues.filter(id => id !== option._id);
                    onChange(question._id, newValues);
                  }}
                  className={commonCheckboxClasses}
                />
                <span className="text-gray-700 dark:text-gray-300">{option.text}</span>
              </label>
            ))}
          </div>
        );

      default:
        return <p className="text-red-500">Tipo de pregunta no soportado: {question.type}</p>;
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-600 pb-6 last:border-0">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {index + 1}. {question.text}
      </h3>
      <div className="space-y-3">
        {renderInput()}
      </div>
    </div>
  );
}; 