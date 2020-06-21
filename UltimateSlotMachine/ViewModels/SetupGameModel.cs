using System.ComponentModel.DataAnnotations;

namespace UltimateSlotMachine.ViewModels
{
    public class SetupGameModel
    {
        [Required]
        public decimal Deposit { get; set; }
        [Required]
        public decimal StackAmount { get; set; }
    }
}