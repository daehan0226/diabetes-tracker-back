export default interface IEmailService {
  send(email: string, subject: string, content: string);
}
