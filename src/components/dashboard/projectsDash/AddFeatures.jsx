const AddFeatures = ({ features, removeFeature }) => {
  return (
    <ul className="mt-3 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
          <span>{feature}</span>
          <button
            onClick={() => removeFeature(index)}
            className="text-red-500 hover:text-red-700"
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AddFeatures;
