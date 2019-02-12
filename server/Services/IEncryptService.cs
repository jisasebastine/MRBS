namespace MRBS.Services
{
    public interface IEncryptService
    {
        string hashPassword(string password);
    }
}