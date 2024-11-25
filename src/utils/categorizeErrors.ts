const categorizeErrors = (errors: Record<string, string>) => {
    let empty = 0;
    let invalid = 0;
  
    for (const key in errors) {
      if (errors[key] === 'Empty') empty++;
      else if (errors[key] === 'Invalid') invalid++;
    }
  
    return { empty, invalid };
  };
  
  export default categorizeErrors;
  