const AddFeatures = ({ features, removeFeature }) => {
  // Default the features prop to an empty array if it's not provided
  const safeFeatures = features || [];

  return (
    <ul className="mt-3 space-y-2">
      {safeFeatures.map((feature, index) => (
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
