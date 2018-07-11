namespace youbefit.Services
{
    public interface IEncryptService
    {
        string hashPassword(string password);
    }
}