module.exports.mockRequest = (data = {}) => ({
    ...data,
    session: {},
    getSession: jest.fn(() => data.user),
  });

module.exports.mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };
