// Componente para una tarjeta individual de pregunta
export const QuestionCard = ({ 
  question, 
  questionIndex, 
  totalQuestions,
  updateQuestion, 
  removeQuestion, 
  addOption, 
  removeOption, 
  updateOption 
}) => {
  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
      {/* Header de la pregunta con botón de eliminar */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Pregunta {questionIndex + 1}
        </h3>
        {totalQuestions > 1 && (
          <button
            type="button"
            onClick={() => removeQuestion(questionIndex)}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            Eliminar
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Campo de texto de la pregunta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pregunta *
          </label>
          <input
            type="text"
            value={question.text}
            onChange={(e) => updateQuestion(questionIndex, 'text', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Escribe tu pregunta aquí..."
          />
        </div>

        {/* Selector de tipo de pregunta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo de pregunta
          </label>
          <select
            value={question.type}
            onChange={(e) => updateQuestion(questionIndex, 'type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="single">Opción única</option>
            <option value="multiple">Opción múltiple</option>
          </select>
        </div>

        {/* Sección de opciones */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Opciones
            </label>
            <button
              type="button"
              onClick={() => addOption(questionIndex)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              Agregar opción
            </button>
          </div>
          
          {/* Lista de opciones */}
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={option.text}
                onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                required
                placeholder={`Opción ${optionIndex + 1}`}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
              {question.options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(questionIndex, optionIndex)}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 