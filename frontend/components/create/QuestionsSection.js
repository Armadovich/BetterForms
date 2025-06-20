import { QuestionCard } from './QuestionCard';

// Componente para la sección de preguntas y opciones
export const QuestionsSection = ({
  formData,
  addQuestion,
  removeQuestion,
  updateQuestion,
  addOption,
  removeOption,
  updateOption
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      {/* Header de la sección con botón para añadir pregunta */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Preguntas
        </h2>
        <button
          type="button"
          onClick={addQuestion}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Agregar pregunta
        </button>
      </div>

      {/* Lista de tarjetas de preguntas */}
      <div className="space-y-6">
        {formData.questions.map((question, questionIndex) => (
          <QuestionCard
            key={questionIndex}
            question={question}
            questionIndex={questionIndex}
            totalQuestions={formData.questions.length}
            updateQuestion={updateQuestion}
            removeQuestion={removeQuestion}
            addOption={addOption}
            removeOption={removeOption}
            updateOption={updateOption}
          />
        ))}
      </div>
    </div>
  );
}; 